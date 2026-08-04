from pathlib import Path
import pandas as pd


class DataFrameManager:

    def load_csv(
        self,
        caminho: str | Path,
        sep: str = ";",
        encoding: str = "utf-8",
        columns: list[str] | None = None,
    ) -> pd.DataFrame:

        path = Path(caminho)

        if not path.exists():
            return pd.DataFrame()

        files: list[Path] = []

        # Arquivo único
        if path.is_file():

            if path.suffix.lower() not in [".csv", ".xlsx", ".xls"]:
                return pd.DataFrame()

            files.append(path)

        # Pasta
        elif path.is_dir():

            files = sorted([
                *path.glob("*.csv"),
                *path.glob("*.xlsx"),
                *path.glob("*.xls"),
            ])

            if not files:
                return pd.DataFrame()

        dataframes = []

        try:

            for file in files:

                if file.stat().st_size == 0:
                    continue

                suffix = file.suffix.lower()

                if suffix == ".csv":

                    df = pd.read_csv(
                        file,
                        sep=sep,
                        encoding=encoding,
                        usecols=columns,
                        low_memory=False,
                    )

                else:

                    df = pd.read_excel(
                        file,
                        usecols=columns,
                    )

                dataframes.append(df)

            if not dataframes:
                return pd.DataFrame()

            return pd.concat(
                dataframes,
                ignore_index=True,
            )

        except Exception as e:
            raise RuntimeError(
                f"Erro ao carregar arquivos: {e}"
            ) from e

    def save_csv(
        self,
        caminho: str | Path,
        df: pd.DataFrame,
        encoding: str = "utf-8",
        sep: str = ";",
    ) -> None:

        path = Path(caminho)

        path.parent.mkdir(parents=True, exist_ok=True)

        try:

            suffix = path.suffix.lower()

            if suffix == ".csv":

                df.to_csv(
                    path,
                    index=False,
                    sep=sep,
                    encoding=encoding,
                )

            elif suffix in [".xlsx", ".xls"]:

                df.to_excel(
                    path,
                    index=False,
                )

            else:
                raise ValueError(
                    "Formato não suportado. Utilize .csv, .xlsx ou .xls"
                )

        except Exception as e:
            raise RuntimeError(
                f"Erro ao salvar arquivo: {e}"
            ) from e