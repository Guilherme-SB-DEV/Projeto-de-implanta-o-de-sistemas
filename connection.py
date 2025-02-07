import mysql.connector
import sys
con = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "123",
    database = "banco"
)
cursor = con.cursor()

def login(usuario, senha):
    usuario = cursor.execute("SELECT * FROM funcionarios WHERE funcionarios=? and senha?;", (usuario, senha))
    if(usuario!=null):
        return usuario
    else:
        return "usuario ou senha incorretos"
def cadastro(usuario, senha, tipo):
    try:
        cursor.execute("INSERT INTO funcionarios (usuario, senha, tipo) values (?, ?, ?);", (usuario, senha, tipo))
        
    except:
        return "erro ao realizar cadastro"+ sys.exc_info[0]
        
def listar_carros():
    try:
        carros = cursor.execute("SELECT * FROM carros;")
    except:
        return "erro ao listar carros" + sys.exc_info[0]
