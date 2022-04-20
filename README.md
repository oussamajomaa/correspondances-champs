# Echart
https://echarts.apache.org/exfeatureamples/en/
https://xieziyu.github.io/ngx-echarts/api-doc/
npm install ngx-echarts -S
npm install ngx-echarts -S

# Install from npm :
## npm install -g "@compodoc/compodoc"

# Create a file named tsconfig.doc.json, containing a key include pointing to src folder, you can also use exclude key :

## 
{
  "include": ["src/**/*.ts"],
  "exclude": ["src/test.ts", "src/**/*.spec.ts", "src/app/file-to-exclude.ts"]
}

# Define a script task for it in your package.json (with npm 6.x) :

"scripts": {
  "compodoc": "npx compodoc -p tsconfig.doc.json"
}

# and run it like a normal npm script :
npm run compodoc

# the local HTTP server is launched at http://localhost:8080
compodoc -s












