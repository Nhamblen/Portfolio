# Noah Hamblen
# 3/10/24

import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
import os

file_names = ["Shows.txt", "Animes.txt", "Books.txt", "Finished.txt", "Favorites.txt"]

def create_or_load_files(root):  #Create file_names and write to them
    for file_name in file_names:
        if not os.path.exists(file_name):
            with open(file_name, "w"):
                pass

    root.title("Text File Manager")
    root.geometry("400x400")
    root.configure(bg="#333")

    selected_file = tk.StringVar(root)
    selected_file.set(file_names[0])

    file_menu = tk.OptionMenu(root, selected_file, *file_names, command=lambda _: load_file(selected_file.get(), text_box))
    file_menu.config(bg="#555", fg="white", bd=2, highlightthickness=0)
    file_menu["menu"].config(bg="#555", fg="white")
    file_menu.pack(pady=10)

    text_box = tk.Text(root, height=15, width=40)
    text_box.pack(pady=10)

    alphabetize_button = tk.Button(root, text="Alphabetize", command=lambda: alphabetize_text_box(text_box, selected_file))
    alphabetize_button.config(bg="#555", fg="white", bd=2)
    alphabetize_button.pack(side="left", padx=(10, 0))

    add_to_favorites_button = tk.Button(root, text="Add to Favorites", command=lambda: add_to_favorites(text_box))
    add_to_favorites_button.config(bg="#555", fg="white", bd=2)
    add_to_favorites_button.pack(side="left", padx=(10, 0))

    style = ttk.Style()
    style.configure("Vertical.TScrollbar", troughcolor="#555", sliderlength=30, width=12)

    scrollbar = ttk.Scrollbar(root, command=text_box.yview, style="Vertical.TScrollbar")
    scrollbar.pack(side="right", fill="y")
    text_box.config(yscrollcommand=scrollbar.set)

    save_button = tk.Button(root, text="Save", command=lambda: save_file(selected_file.get(), text_box))
    save_button.config(bg="#555", fg="white", bd=2)
    save_button.pack(side="right", padx=(0, 10))

    load_file(selected_file.get(), text_box)

def load_file(file_name, text_box): #Loads the file when option is clicked
    with open(file_name, "r") as file:
        content = file.read()
        formatted_content = '\n'.join(' '.join(word.capitalize() for word in line.split()) for line in content.split('\n'))
        text_box.delete("1.0", tk.END)
        text_box.insert(tk.END, formatted_content)

def save_file(file_name, text_box): #Saves the file when button is clicked
    with open(file_name, "w") as file:
        content = text_box.get("1.0", tk.END)
        formatted_content = '\n'.join(' '.join(word.capitalize() for word in line.split()) for line in content.split('\n'))
        file.write(formatted_content)

def alphabetize_text_box(text_box, selected_file): #Alphabetizes the files when button is clicked (to keep alphabetized changes, click save after this button)
    content = text_box.get("1.0", tk.END)
    lines = content.split('\n')
    lines.sort()
    alphabetized_content = '\n'.join(lines)
    text_box.delete("1.0", tk.END)
    text_box.insert(tk.END, alphabetized_content.strip())

def add_to_favorites(text_box): #Adds items to favorites file when button is clicked
    selected_text = text_box.tag_ranges(tk.SEL)
    if selected_text:
        start, end = selected_text
        content_to_add = text_box.get(start, end)
        with open("Favorites.txt", "a") as fav_file:
            fav_file.write(content_to_add + "\n")
            tk.messagebox.showinfo("Success", "Item added to Favorites!")
    else:
        tk.messagebox.showwarning("Warning", "Select text to add to Favorites.")

if __name__ == "__main__":
    root = tk.Tk()
    create_or_load_files(root)
    root.mainloop()

