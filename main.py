import sys

from PySide6.QtWidgets import QApplication

from app.interface_execute import InterfaceExecute


def main():

    app = QApplication(sys.argv)

    window = InterfaceExecute()
    window.show()

    sys.exit(app.exec())


if __name__ == "__main__":
    main()