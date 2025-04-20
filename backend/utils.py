import pandas as pd

def fusionner_fichiers(file_list):
    dfs = []
    for file in file_list:
        df = pd.read_excel(file, header=2, usecols=[
            "Date Time", "Turbine Name", "Wind Speed[m/s]", "Active Power[kW]", "Generator Status"
        ])
        dfs.append(df)
    df_concat = pd.concat(dfs, ignore_index=True)
    df_concat.sort_values("Date Time", inplace=True)
    return df_concat


def get_date_info(df: pd.DataFrame):
    df["Date Time"] = pd.to_datetime(df["Date Time"])
    date_min = df["Date Time"].min()
    date_max = df["Date Time"].max()
    duree_heures = (date_max - date_min).total_seconds() / 3600
    duree_jours = duree_heures / 24
    return {
        "date_min": date_min.strftime("%Y-%m-%d %H:%M"),
        "date_max": date_max.strftime("%Y-%m-%d %H:%M"),
        "duree_heures": round(duree_heures, 1),
        "duree_jours": round(duree_jours, 1)
    }
