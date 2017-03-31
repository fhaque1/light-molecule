from flask import Flask, render_template, redirect, url_for, request, jsonify
import csv

app = Flask(__name__)
app.secret_key = 'imagine-you-are-a-light-molecule...'

state = 'New York'
year = '2010'

@app.route("/")
# displays the data visualization
def home():
    return render_template('main.html', info = readStateByYear(state, year), dObj = getInfo() )

# reads csv file and returns an array
# dictionary of list of lists
# sublist item order:
#     { year : [ [state, net_job_creation_rate, births, dhs denominator, deaths, etc.],
#                [state, net_job_creation_rate, births, dhs denominator, deaths, etc.], etc ] }
def read():
    with open('data/jobs.csv', 'rb') as f:
        reader = csv.reader(f)
        arr = list(reader)
    header = arr[0]
    arr = arr[1:]
    tmp = {}
    for row in arr:
        if row[0] not in tmp:
            tmp[row[0]] = [row[1:]]
        else:
            tmp[row[0]] = tmp[row[0]] + [row[1:]]
    tmp[header[0]] = [header[1:]]
    return tmp


# returns a list of lists without state or year
# sublist ordered by year
# sublist item ordered by state alphabetically:
#     [ net_job_creation_rate, births, dhs denominator, deaths, etc.],
#     [ net_job_creation_rate, births, dhs denominator, deaths, etc.], etc ] }
def getInfo():
    arr = read()
    del arr['Year']
    tmp = []
    for key in sorted(arr.iterkeys()):
        record = arr[key]
        tmp2 = []
        for s in record:
            s = s[1:]
            tmp2.append(s)
        tmp.append(tmp2)
    return tmp
    
# returns a list of all the stats for a state in a given year
def readStateByYear(s, y):
    allStats = read()
    oneYear = allStats[y]
    for state in oneYear:
        if state[0] == s:
            oneState = state
    header = allStats['Year'][0]
    arr = ['Year: ' + y, 'State: ' + s]
    ctr = 1
    while ctr < len(oneState):
        arr.append( header[ctr] + ': ' + oneState[ctr])
        ctr += 1
    return arr

if __name__ == "__main__":
    app.debug = True
    app.run()
