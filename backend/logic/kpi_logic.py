import pandas as pd
import numpy as np

def calculer_kpi(df: pd.DataFrame):
    df.dropna(subset=["Date Time"], inplace=True)
    df["Date Time"] = pd.to_datetime(df["Date Time"])
    df["Temps"] = 10 / 60  # 10 min en heures

    courbe_contrat = {
        3.0: 30, 4.0: 150, 5.0: 370, 6.0: 690, 7.0: 1130,
        8.0: 1700, 9.0: 2400, 10.0: 3060, 11.0: 3660, 12.0: 4170,
        13.0: 4580, 14.0: 4850, 15.0: 4960, 16.0: 4980, 17.0: 4990, 18.0: 4990,
        19.0: 4990, 20.0: 4980, 21.0: 4940, 22.0: 4850, 23.0: 4690, 24.0: 4500,
        25.0: 4330, 26.0: 4210, 27.0: 4110, 28.0: 0
    }

    vitesses = list(courbe_contrat.keys())
    puissances = list(courbe_contrat.values())
    results = []

    for turbine in df["Turbine Name"].unique():
        data = df[df["Turbine Name"] == turbine].copy()
        data.sort_values("Date Time", inplace=True)

        data["Puissance Théo [kW]"] = data["Wind Speed[m/s]"].apply(lambda v: np.interp(v, vitesses, puissances))
        data["Energie réelle [kWh]"] = data["Active Power[kW]"] * data["Temps"]
        data["Energie théorique [kWh]"] = data["Puissance Théo [kW]"] * data["Temps"]

        t_vent = data[data["Wind Speed[m/s]"].between(3, 27)]["Temps"].sum()
        t_prod = data[data["Active Power[kW]"] > 30]["Temps"].sum()
        t_inactif = data[(data["Active Power[kW]"] <= 0) & (data["Wind Speed[m/s]"].between(3, 27))]["Temps"].sum()

        dispo = (t_prod / (t_vent - 1.25)) * 100 if t_vent > 1.25 else 0
        arret = (t_inactif / t_vent) * 100 if t_vent > 0 else 0

        arrets = []
        debut = None
        for i in range(len(data)):
            statut = data.iloc[i]["Generator Status"]
            if statut == "Generator is inactive":
                if debut is None:
                    debut = data.iloc[i]["Date Time"]
            else:
                if debut is not None:
                    fin = data.iloc[i - 1]["Date Time"]
                    arrets.append((fin - debut).total_seconds() / 3600)
                    debut = None
        if debut is not None:
            fin = data.iloc[-1]["Date Time"]
            arrets.append((fin - debut).total_seconds() / 3600)

        n = len(arrets)
        t_down = sum(arrets)
        t_total = (data["Date Time"].iloc[-1] - data["Date Time"].iloc[0]).total_seconds() / 3600
        mttr = t_down / n if n else 0
        mtbf = (t_total - t_down) / n if n else 0
        mttf = mtbf - mttr if mtbf > mttr else 0
        fiab = (mtbf / (mtbf + mttr)) * 100 if (mtbf + mttr) > 0 else 0

        energie_reelle = data["Energie réelle [kWh]"].sum()
        energie_theo = data["Energie théorique [kWh]"].sum()
        efficacite = (energie_reelle / energie_theo) * 100 if energie_theo > 0 else 0

        cap_max = 5000 * len(data) * data["Temps"].iloc[0]
        fc = (energie_reelle / cap_max) * 100 if cap_max > 0 else 0

        results.append({
            "Turbine": turbine,
            "Disponibilité (%)": round(dispo, 2),
            "Temps d'arrêt (%)": round(arret, 2),
            "Fiabilité (%)": round(fiab, 2),
            "MTTR (h)": round(mttr, 2),
            "MTBF (h)": round(mtbf, 2),
            "MTTF (h)": round(mttf, 2),
            "Facteur de capacité (%)": round(fc, 2),
            "Efficacité (%)": round(efficacite, 2)
        })

    return results
