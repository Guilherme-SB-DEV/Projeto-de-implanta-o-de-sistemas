import tkinter as tk
from tkinter import messagebox
from connection import login, cadastro, listar_carros


def tela_principal():
    #add linha na tabela
    def adicionar_linha(cor, placa, modelo, categoria):
        tree.insert("", "end", values=(cor, placa, modelo, categoria))
    
    def excluir_linha(id_item):
        # Confirmação de exclusão
        confirmar = messagebox.askyesno("Excluir", "Tem certeza que deseja excluir esta linha?")
        if confirmar:
            tree.delete(id_item)
    def refresh():
        carros = listar_carros()
        for carro in carros:
            adicionar_linha(carro.placa, carro.modelo, carro.categoria)
        






    login_cad.destroy()

    # Criar a janela principal
    main = tk.Tk()
    main.title("Tela Principal")
    main.geometry("800x400")

    # Criar a tabela (Treeview)
    columns = ("Código", "Cliente", "Produto", "Quantidade", "Preço Unitário", "Excluir", "Imprimir")
    tree = ttk.Treeview(main, columns=columns, show="headings")

    # Configurar colunas
    for col in columns:
        tree.heading(col, text=col)
        tree.column(col, width=100)

    tree.pack(pady=20)

    refresh()

    # Botão para adicionar uma nova linha
    botao_adicionar = tk.Button(main, text="Adicionar Linha", command=adicionar_linha)
    botao_adicionar.pack(pady=10)
    # Exibir a tela
    main.mainloop()






# Criação da janela principal
login_cad = tk.Tk()
login_cad.title("Tela de Login")

# Configuração da janela
login_cad.geometry("300x200")

# Criar e posicionar os rótulos e campos de entrada
label_usuario = tk.Label(login_cad, text="Usuário:")
label_usuario.pack(pady=5)

entry_usuario = tk.Entry(login_cad)
entry_usuario.pack(pady=5)

label_senha = tk.Label(login_cad, text="Senha:")
label_senha.pack(pady=5)

entry_senha = tk.Entry(login_cad, show="*")
entry_senha.pack(pady=5)

# Botão de login
botao_login = tk.Button(login_cad, text="Login", command= login(entry_usuario, entry_senha))
botao_login.pack(pady=20)

#Botão de cadastro
botao_cadastro = tk.Button(login_cad, text = "cadastrar-se", command= cadastro(entry_usuario, entry_senha))
botao_login.pack(pady=20)

# Rodar a interface
login_cad.mainloop()
