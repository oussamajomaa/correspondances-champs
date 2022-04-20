with open('file.csv', 'r') as file_csv:
    fieldnames = ("field1","field2")
    reader = csv.DictReader(file_csv, fieldnames)
    
with open('myfile.json', 'w') as file_json:
    for row in reader:
            json.dump(row, file_json) 