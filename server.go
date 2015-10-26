package main

import (
	"fmt"
	"html/template"
	"net/http"
)

var indexTemplate, err = template.ParseFiles("index.html")

func serveIndex(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		err = indexTemplate.Execute(w, nil)
	}
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
}

func serveSingle(pattern string, filename string) {
	http.HandleFunc(pattern, func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	})
}

func main() {
	http.HandleFunc("/", serveIndex)
	serveSingle("/build/main.js", "./public/build/main.js")
	fmt.Println("Server listing at port 3000")
	http.ListenAndServe(":3000", nil)
}
