import Adafruit_BMP.BMP085 as BMP
import smbus
import time
import RPi.GPIO as GPIO

# BMP180 레지스터 주소
BMP180_ADDR = 0x77
# 온도 측정 레지스터
TEMPERATURE_REG = 0xF4
# 온도 측정 결과 레지스터
TEMPERATURE_RESULT_REG = 0xF6

# 피에조 패시브 부저 핀 설정
BUZZER_PIN = 18

# I2C 버스 초기화
bus = smbus.SMBus(1)

# BMP 센서 설정
sensor = BMP.BMP085(busnum=1)

# 피에조 패시브 부저 설정
GPIO.setmode(GPIO.BCM)
GPIO.setup(BUZZER_PIN, GPIO.OUT)

def read_temperature():
    # 온도 측정 시작
    bus.write_byte_data(BMP180_ADDR, TEMPERATURE_REG, 0x2E)
    # 4.5ms 대기
    time.sleep(0.0045)
    # 온도 측정 결과 읽기
    msb = bus.read_byte_data(BMP180_ADDR, TEMPERATURE_RESULT_REG)
    lsb = bus.read_byte_data(BMP180_ADDR, TEMPERATURE_RESULT_REG + 1)
    # 온도 계산
    temperature = ((msb << 8) + lsb) / 10.0
    return temperature

try:
    while True:
        temperature = sensor.read_temperature()
        print("현재 온도: {:.1f}도".format(temperature))
        
        if temperature > 20:
            # 피에조 패시브 부저 울리기
            GPIO.output(BUZZER_PIN, GPIO.HIGH)
        else:
            # 피에조 패시브 부저 멈추기
            GPIO.output(BUZZER_PIN, GPIO.LOW)
        
        time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()
