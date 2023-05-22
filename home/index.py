from flask.json import jsonify
import Adafruit_BMP.BMP085 as BMP
import time
import mysql.connector
from flask import Flask, render_template
import threading
from flask import Request



# MySQL 연결 설정
mysql_user = 'f5'
mysql_password = '1234'
mysql_host = '192.168.30.4'  # MySQL 서버 주소
mysql_database = 'raspi_db_medical'
mysql_table = 'vaccine_refr'
mysql_table2 = 'vaccine_refr_pfizer'

# MySQL 연결
cnx = mysql.connector.connect(user=mysql_user, password=mysql_password, host=mysql_host, database=mysql_database)
cursor = cnx.cursor()

# BMP 센서 설정
sensor = BMP.BMP085(busnum=1)

# Flask 애플리케이션 생성
app = Flask(__name__)

# 서버에 값 전달
@app.route('/update_sensor_data')
def update_sensor_data():
    temp = sensor.read_temperature()
    
    sensor_data = {'temp': temp}
    return jsonify(sensor_data)

# 루트 경로 처리
@app.route('/')
def home1():
    return render_template('index.html')

# 루트 경로 처리
@app.route('/blood')
def home2():
    return render_template('blood.html')

# 루트 경로 처리
@app.route('/vaccine')
def home3():
    return render_template('vaccine.html')

# 데이터 측정 및 저장 함수
def measure_and_store_data():
    try:

        temp = sensor.read_temperature()
        temp2 = round(temp - 23, 1)

    # 삽입 쿼리 작성
        insert_query_1 = "INSERT INTO {} (v_dateTime, v_type, v_temperature, v_stockingDate) VALUES (now(), 'astra', {}, null )".format(mysql_table, temp2)
        insert_query_2 = "INSERT INTO {} (v_dateTime, v_type, v_temperature, v_stockingDate) VALUES (now(), 'pfizer', {}, null )".format(mysql_table2, temp2)

   
        # 쿼리 실행
        cursor.execute(insert_query_1)
        cursor.execute(insert_query_2)
        cnx.commit()
        print('Temperature inserted: {}'.format(temp))
    except mysql.connector.Error as error:
        print('Failed to insert temperature: {}'.format(error))

    time.sleep(5)


# Flask 애플리케이션 실행
if __name__ == '__main__':
    # 측정 및 저장 스레드 시작
    measurement_thread = threading.Thread(target=measure_and_store_data)
    measurement_thread.start()

    # Flask 애플리케이션 실행
    app.run(host='192.168.30.4', port=5000)

# 연결 종료
cursor.close()
cnx.close()
