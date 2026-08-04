from pathlib import Path
from datetime import datetime
import traceback

from PySide6.QtCore import QObject, QThread, Signal
from PySide6.QtWidgets import (
    QWidget,
    QLabel,
    QLineEdit,
    QPushButton,
    QFileDialog,
    QMessageBox,
    QVBoxLayout,
    QHBoxLayout,
    QPlainTextEdit
)

from app.use_cases.extract_pcom_pvs_unid import ExecutePcommExtractPVSUnid


class ExecuteWorker(QObject):

    finished = Signal()
    error = Signal(str)
    log = Signal(str)

    def __init__(self, path, empresa, login, senha):
        super().__init__()

        self.path = path
        self.empresa = empresa
        self.login = login
        self.senha = senha

    def run(self):

        try:

            ExecutePcommExtractPVSUnid().execute_routine(
                path=self.path,
                empresa=self.empresa,
                login=self.login,
                senha=self.senha,
                log=self.log.emit
            )

            self.finished.emit()

        except Exception as e:
            traceback.print_exc()
            erro = traceback.format_exc()
            self.error.emit(erro)


class InterfaceExecute(QWidget):

    def __init__(self):
        super().__init__()

        self.setWindowTitle("WaveHub - Extração PVS")
        self.resize(600, 320)

        self.setup_ui()

    def setup_ui(self):

        layout = QVBoxLayout(self)
        layout.setSpacing(12)

        titulo = QLabel("WaveHub - Extração PVS")
        titulo.setStyleSheet("""
            font-size:22px;
            font-weight:bold;
        """)

        layout.addWidget(titulo)

        self.input_empresa = QLineEdit()
        self.input_empresa.setPlaceholderText("Empresa")

        self.input_login = QLineEdit()
        self.input_login.setPlaceholderText("Login")

        self.input_senha = QLineEdit()
        self.input_senha.setPlaceholderText("Senha")
        self.input_senha.setEchoMode(QLineEdit.Password)

        layout.addWidget(self.input_empresa)
        layout.addWidget(self.input_login)
        layout.addWidget(self.input_senha)

        self.input_path = QLineEdit()
        self.input_path.setPlaceholderText("Arquivo CSV ou Excel")

        btn_procurar = QPushButton("Procurar")
        btn_procurar.clicked.connect(self.selecionar_arquivo)

        path_layout = QHBoxLayout()
        path_layout.addWidget(self.input_path)
        path_layout.addWidget(btn_procurar)

        layout.addLayout(path_layout)

        layout.addStretch()

        self.btn_executar = QPushButton("EXECUTAR")
        self.btn_executar.setMinimumHeight(45)
        self.btn_executar.clicked.connect(self.executar)
        self.logs = QPlainTextEdit()
        self.logs.setReadOnly(True)
        self.logs.setMinimumHeight(220)

        layout.addWidget(QLabel("Logs"))
        layout.addWidget(self.logs)
        layout.addWidget(self.btn_executar)

    def log(self, texto: str):

        horario = datetime.now().strftime("%H:%M:%S")

        self.logs.appendPlainText(
            f"[{horario}] {texto}"
        )

        scrollbar = self.logs.verticalScrollBar()
        scrollbar.setValue(scrollbar.maximum())

    def selecionar_arquivo(self):

        arquivo, _ = QFileDialog.getOpenFileName(
            self,
            "Selecionar relatório",
            "",
            "Planilhas (*.csv *.xlsx *.xls)"
        )

        if arquivo:
            self.input_path.setText(arquivo)

    def executar(self):

        empresa = self.input_empresa.text().strip()
        login = self.input_login.text().strip()
        senha = self.input_senha.text().strip()
        path = self.input_path.text().strip()

        self.logs.clear()

        self.log("Iniciando rotina...")
        self.log("Empresa: " + empresa)
        self.log("Arquivo: " + path)

        if not all([empresa, login, senha, path]):

            QMessageBox.warning(
                self,
                "Campos obrigatórios",
                "Preencha todos os campos."
            )

            return

        if not Path(path).exists():

            QMessageBox.warning(
                self,
                "Arquivo",
                "Arquivo não encontrado."
            )

            return

        self.btn_executar.setEnabled(False)
        self.btn_executar.setText("Executando...")

        self.thread = QThread()

        self.worker = ExecuteWorker(
            path=path,
            empresa=empresa,
            login=login,
            senha=senha,
        )

        self.worker.moveToThread(self.thread)

        self.thread.started.connect(self.worker.run)

        self.worker.finished.connect(self.on_finish)
        self.worker.error.connect(self.on_error)
        self.worker.log.connect(self.log)

        self.worker.finished.connect(self.thread.quit)
        self.worker.error.connect(self.thread.quit)

        self.thread.finished.connect(self.thread.deleteLater)
        self.worker.finished.connect(self.worker.deleteLater)

        self.thread.start()

    def on_finish(self):

        self.btn_executar.setEnabled(True)
        self.btn_executar.setText("EXECUTAR")
        self.log("Rotina finalizada com sucesso.")

        QMessageBox.information(
            self,
            "Sucesso",
            "Extração concluída."
        )

    def on_error(self, erro):

        self.btn_executar.setEnabled(True)
        self.btn_executar.setText("EXECUTAR")
        self.log(f"ERRO: {erro}")

        QMessageBox.critical(
            self,
            "Erro",
            erro
        )