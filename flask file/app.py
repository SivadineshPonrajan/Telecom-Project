# Importing random to generate random string sequence
import random
# Importing string library function
import string
from flask import Flask,redirect,request,jsonify
from flask_restful import Resource,Api
from flaskext.mysql import MySQL
from flask_cors import CORS

import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

mysql=MySQL()

app=Flask(__name__)
CORS(app)
port = 5000

if __name__ == "__main__":
    if len(sys.argv) > 1:
        env = sys.argv[1]
        print("env=" + env)
    if len(sys.argv) > 2:
        port = sys.argv[2]
        print("port=" + port)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = "airfone"
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)

api = Api(app)
class Login(Resource):
    # OTP Generation
    def get(self, phone):
        # establishing connection to the database
        conn = mysql.connect()
        cursor = conn.cursor()
        # for getting the email registered to send the otp
        cursor.execute("select email from loginDetails where phone='"+phone+"'")
        result=cursor.fetchall()
        if len(result) > 0:
            for row in result:
                toemail= row[0]
        else:
            return {"otpGeneration": "Invaild Number. Switch to AirFone to login"}
        # for OTP generation
        otp=''.join([random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits)for n in range(6)])
        # updating the pre existed otp of the table
        cursor.execute("update loginDetails set otp='" + str(otp) + "' where phone='" + phone + "'")
        conn.commit()
        # Calling emailattach function using email class
        Email().emailattach("airfoneteam1@gmail.com", toemail, "The OTP for the login is : "+otp,"","")
        return {"otpGeneration": "success"}

    def post(self, phone):
        #otpValidation
        conn = mysql.connect()
        cursor = conn.cursor()
        data = request.get_json()
        query = "select email from loginDetails where phone='" + phone + "' && otp='" + data['otp'] + "'"
        cursor.execute(query)
        rows = cursor.fetchall()
        # print(result)
        if len(rows) > 0:
            user = jsonify(rows)
            mismatch=''.join([random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits)for n in range(6)])
            update_query = "update loginDetails set otp = '"+mismatch+"' where phone='" + phone + "'"
            cursor.execute(update_query)
            return {"Authentication": "success"}
        return {"Authentication": "failed"}

class Customerplans(Resource):
    def get(self):
        conn = mysql.connect()
        cursor = conn.cursor()
        custplans_query = "select cd.phone,cd.custName,p.planCategory,p.planName,cp.starter from customerDetails cd inner join currentPlan cp inner join plans p on cd.phone=cp.phone and cp.planId=p.planId;"
        cursor.execute(custplans_query)
        rows = cursor.fetchall()
        if len(rows) > 0:
            mydict = {}
            customers = []
            for i in range(len(rows)):
                customers.append({'phone': rows[i][0], 'custName': rows[i][1], 'planCategory': rows[i][2], 'planName': rows[i][3],'starter': str(rows[i][4])})
            mydict["allCustomers"] = customers
            mydict["customers"] = "success"
            return mydict
        return {'customers': "None"}

    def post(self):
        data=request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        in_query = "insert into newcustomers (custName, dob, address, gender, email, phone, status) values('"+data['custName']+"', '"+data['dob']+"', '"+data['address']+"', '"+data['gender']+"', '"+data['email']+"', '"+data['phone']+"', 1)"
        print(in_query)
        cursor.execute(in_query)
        conn.commit()
        return {'reg': "success"}

class AdminNewCustomer(Resource):
    def get(self):
        conn = mysql.connect()
        cursor = conn.cursor()
        custplans_query = "select * from newcustomers where status = 1"
        cursor.execute(custplans_query)
        rows = cursor.fetchall()
        if len(rows) > 0:
            mydict = {}
            customers = []
            for i in range(len(rows)):
                customers.append({"name":rows[i][0], "dob": str(rows[i][1]), "address": rows[i][2], "gender": rows[i][3], "email": rows[i][4], "phone": rows[i][5] })
            mydict["allCustomers"] = customers
            mydict["customers"] = "success"
            return mydict
        return {'customers': "None"}

    def post(self):
        data=request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        in_query = "insert into newcustomers (custName, dob, address, gender, email, phone, status) values('"+data['custName']+"', '"+data['dob']+"', '"+data['address']+"', '"+data['gender']+"', '"+data['email']+"', '"+data['phone']+"', 1)"
        print(in_query)
        cursor.execute(in_query)
        conn.commit()
        return {'reg': "success"}

class AdminAccept(Resource):
    def post(self):
        data=request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        in_query = "insert into customerdetails (custName, dob, address, gender, email, phone) values('"+data['name']+"', '"+data['dob']+"', '"+data['address']+"', '"+data['gender']+"', '"+data['email']+"', '"+str(data['phone'])+"')"
        print(in_query)
        cursor.execute(in_query)
        insert_query = "insert into loginDetails(phone,email,otp) values('"+str(data['phone'])+"','"+data['email']+"','')"
        print(insert_query)
        cursor.execute(insert_query)
        update_query = "update newcustomers set status = 0 where email = '"+data['email']+"' and custName = '"+data['name']+"'"
        print(update_query)
        cursor.execute(update_query)
        conn.commit()
        conn.close()
        bill_msg = "Your service is activated with phone number: "+str(data['phone'])+". Try to login in the platform"
        Email().emailattach("airfoneteam1@gmail.com", data['email'], bill_msg, "", "")
        return {'reg': "success"}

class AdminTicket(Resource):
    def post(self):
        data=request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        ticket_query = "select ticketId,phone,planCategory,ticket,dateTicketRaised,status from tickets where planCategory= '"+data['planCategory']+"' "
        cursor.execute(ticket_query)
        rows = cursor.fetchall()
        mydict = {}
        if len(rows) > 0:
            plans = []
            for i in range(len(rows)):
                plans.append({'ticketId': rows[i][0], 'phone': rows[i][1], 'planCategory': rows[i][2], 'ticket': rows[i][3],'dateTicketRaised': str(rows[i][4]),'status': rows[i][5]})
            mydict["allAdminPlans"] = plans
            mydict["adminTickets"] = "success"
            return mydict
        return {'adminTickets': "None"}

    def put(self):
        data=request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        tid_query = "update tickets set status=false where ticketId='"+str(data['ticketId'])+"' "
        cursor.execute(tid_query)
        phone = ""
        ticket = ""
        cursor.execute("select phone, ticket from tickets where ticketId='" + str(data['ticketId']) + "'")
        result = cursor.fetchall()
        if len(result) > 0:
            for row in result:
                phone = row[0]
                ticket = row[1]
        toemail = ""
        cursor.execute("select email from loginDetails where phone='" + phone + "'")
        result = cursor.fetchall()
        if len(result) > 0:
            for row in result:
                toemail = row[0]
        conn.commit()
        conn.close()
        bill_msg = "The raised ticket with ticket Id " + str(data['ticketId']) + " with the query of '" + ticket +"' is resolved successfully!"
        Email().emailattach("airfoneteam1@gmail.com", toemail, bill_msg, "", "")
        response={"updation": "success"}
        return response

class Profile(Resource):
    def get(self, phone):
        conn = mysql.connect()
        cursor = conn.cursor()
        select_query = "select * from customerDetails where phone = '" + phone + "'"
        cursor.execute(select_query)
        rows = cursor.fetchall()
        if len(rows) > 0:
            return {"profile": "success", "name":rows[0][0], "dob": str(rows[0][1]), "address": rows[0][2], "gender": rows[0][3], "email": rows[0][4], "phone": rows[0][5] }
        return {'profile': "Login and proceed to profile"}

    def put(self, phone):
        data = request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        update_query = "update customerDetails set custName='"+data['name']+"', gender='"+data['gender']+"', email='"+data['email']+"' where phone= '" + phone + "'"
        cursor.execute(update_query)
        conn.commit()
        conn.close()
        response={"updation": "success"}
        return response

class Order(Resource):
    def get(self):
        conn = mysql.connect()
        cursor = conn.cursor()
        select_query = "select * from plans"
        cursor.execute(select_query)
        rows = cursor.fetchall()
        mydict = {}
        arr = []
        if len(rows) > 0:
            for row in rows:
                arr.append({"pid": str(row[0]), "name": row[1], "cost": row[2], "validity": row[3], "category": row[4]})
                mydict["plans"] = arr
            conn.commit()
            conn.close()
            return mydict
        return {'plans': "error"}

class Checkout(Resource):
    def get(self, pid):
        conn = mysql.connect()
        cursor = conn.cursor()
        select_query = "select * from plans where planId = " + pid
        cursor.execute(select_query)
        row = cursor.fetchall()
        mydict = {}
        arr = []
        if len(row) > 0:
            return {"plan":"success", "planName": row[0][1], "planCost": str(row[0][2]), "planValidity": str(row[0][3]), "planCategory": row[0][4]}
            conn.commit()
            conn.close()
        else:
            return {"plan": "None"}

    def post(self, pid):
        data=request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        insert_query="insert into currentplan(phone, planId, starter) values('"+data['phone']+"', "+pid+", now())"
        cursor.execute(insert_query)
        toemail=""
        cursor.execute("select email from loginDetails where phone='" + data['phone'] + "'")
        result = cursor.fetchall()
        if len(result) > 0:
            for row in result:
                toemail = row[0]
        bill_query="select * from plans where planId = " + pid
        cursor.execute(bill_query)
        row =cursor.fetchall()
        bill_msg = "The new plan is added to your current plan successfully.\nThe assigned new plan will be activated once the old plan expires.\nNew plan name : "+row[0][1]+".\nPlan Cost : "+str(row[0][2])+" INR.\nPlan Validity : "+str(row[0][3])+" days.\nPlan Category : "+row[0][4]+".\n\n\nThank you"
        # # Calling emailattach function using email class
        Email().emailattach("airfoneteam1@gmail.com", toemail, bill_msg, "", "")
        response={"bill":"raised"}
        conn.commit()
        return response
        

class Tickets(Resource):
    def get(self, phone):
        conn = mysql.connect()
        cursor = conn.cursor()
        select_query = "select * from tickets where phone = '" + phone + "'"
        cursor.execute(select_query)
        rows = cursor.fetchall()
        mydict = {}
        arr = []
        if len(rows) > 0:
            for row in rows:
                arr.append({"ticketId":row[0], "dateTicketRaised": str(row[1]), "planCategory": row[3], "ticket": row[4], "status": str(row[5])})
            mydict["ticketArray"] = arr
            mydict["tickets"] = "success"
            conn.commit()
            conn.close()
            return mydict
        else:
            return {"tickets": "None"}
        return {'tickets': "Tickets Error"}

    def post(self, phone):
        data=request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        insert_query="insert into tickets(dateTicketRaised,phone,planCategory,ticket,status) values(now(),'" +phone+"','"+data['planCategory']+"', '"+data['ticket']+ "',true)"
        cursor.execute(insert_query)
        toemail=""
        cursor.execute("select email from loginDetails where phone='" + phone + "'")
        result = cursor.fetchall()
        if len(result) > 0:
            for row in result:
                toemail = row[0]
        ticket_query="select max(ticketId) from tickets where phone='" +phone +"'"
        cursor.execute(ticket_query)
        rows =cursor.fetchall()
        if len(result) >0:
            for row in rows:
                tid=row[0]
        # Calling emailattach function using email class
        Email().emailattach("airfoneteam1@gmail.com", toemail, "The ticket raised successfully.\nThe assigned ticket id is : " +str(tid)+
                            " for the issue "+data['ticket'], "", "")
        response={"ticket":"raised"}
        conn.commit()
        return response
        return 201

class Plans(Resource):
    def get(self, phone):
        conn = mysql.connect()
        cursor = conn.cursor()
        ticket_query="select planCategory from currentPlan inner join plans on currentPlan.planId = plans.planId where phone='"+ phone + "'"
        cursor.execute(ticket_query)
        rows=cursor.fetchall()
        mydict = {}
        arr = []
        if len(rows)>0:
            x = ""
            for row in rows:
                arr.append(row[0])
                mydict["myplans"] = arr
            return mydict
        return {'myplans': "None"}

class AdminDash(Resource):
    def get(self, category):
        conn = mysql.connect()
        cursor = conn.cursor()
        ticket_query="select count(*) from currentPlan inner join plans on currentPlan.planId = plans.planId where planCategory='"+ category + "'"
        cursor.execute(ticket_query)
        rows=cursor.fetchall()
        return {'allPlans': "success", 'data': str(rows[0][0])}

class IsUser(Resource):
    def get(self, phone):
        conn = mysql.connect()
        cursor = conn.cursor()
        ticket_query="select count(*) from logindetails where phone='"+ phone + "'"
        cursor.execute(ticket_query)
        rows=cursor.fetchall()
        return {'IsUser': "success", 'data': str(rows[0][0])}

# Email module to create an conn
class Email:
    def emailattach(self, fromaddr, toaddr, content,filename,path):

        # mail details
        msg = MIMEMultipart()
        msg['From'] = fromaddr
        msg['To'] = toaddr
        msg['Subject'] = "Subject_of_the_mail"
        body = content

        # attach the body with the msg instance
        msg.attach(MIMEText(body, 'plain'))

        # starting the smtp session
        s = smtplib.SMTP('smtp.gmail.com', 587)

        # starting the TLS for security
        s.starttls()
        # Authentication of the server mail
        s.login(fromaddr, "airfone123")
        # Converts the Multipart msg into a string
        text = msg.as_string()
        # with attachment condition
        if(filename and path):
            attachment = open(path, "rb")
            # instance of MIMEBase and named as p
            p = MIMEBase('application', 'octet-stream')
            # To change the payload into encoded form
            p.set_payload((attachment).read())
            # encode into base64
            encoders.encode_base64(p)
            p.add_header('Content-Disposition', "attachment; filename= %s" % filename)
            # attach the instance 'p' to instance 'msg'
            msg.attach(p)
            text = msg.as_string()
        s.sendmail(fromaddr, toaddr, text)
        print("email sent")
        # terminating the session
        s.quit()


# defining the url
api.add_resource (Login ,'/login/<string:phone>')
api.add_resource (Profile ,'/profile/<string:phone>')
api.add_resource (Tickets ,'/tickets/<string:phone>')
api.add_resource (Plans ,'/myplans/<string:phone>')
api.add_resource(Customerplans,'/adminCustomers')
api.add_resource(AdminTicket,'/adminTickets')
api.add_resource(AdminNewCustomer,'/adminNewCustomer')
api.add_resource(Checkout,'/checkout/<string:pid>')
api.add_resource (AdminDash ,'/admindash/<string:category>')
api.add_resource (IsUser ,'/isuser/<string:phone>')
api.add_resource (AdminAccept ,'/accept')
api.add_resource (Order ,'/order')
app.run(port=port,debug=True)