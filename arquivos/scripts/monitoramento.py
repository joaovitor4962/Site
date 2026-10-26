import psutil
import platform
import time
import os

def limpar_tela():
    os.system('cls' if os.name == 'nt' else 'clear')

def monitorar():
    while True:
        limpar_tela()
        print("="*40)
        print(f" MONITORAMENTO DO SISTEMA - {platform.node()} ")
        print("="*40)

        cpu_percent = psutil.cpu_percent(interval=1)
        print(f"CPU: {cpu_percent}%")

        ram = psutil.virtual_memory()
        print(f"Memória RAM: {ram.percent}% ({ram.used // (1024**2)} MB usados de {ram.total // (1024**2)} MB)")

        disco = psutil.disk_usage('/')
        print(f"Disco: {disco.percent}% ({disco.used // (1024**3)} GB usados de {disco.total // (1024**3)} GB)")

        net = psutil.net_io_counters()
        print(f"Rede - Enviados: {net.bytes_sent // 1024} KB | Recebidos: {net.bytes_recv // 1024} KB")

        try:
            temps = psutil.sensors_temperatures()
            if "coretemp" in temps:
                for i, t in enumerate(temps["coretemp"]):
                    print(f"Temperatura CPU Core {i}: {t.current}°C")
        except Exception:
            print("Temperatura: não suportado")

        print("="*40)
        time.sleep(2)  # atualiza a cada 2 segundos

if __name__ == "__main__":
    monitorar()
