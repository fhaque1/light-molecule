print "working?"
from flask import Flask, render_template, redirect, url_for, request, jsonify, json
import sys
import csv

app = Flask(__name__)
app.secret_key = 'imagine-you-are-a-light-molecule...'

state = 'New York'
year = '1977'

@app.route("/", methods = ['GET', 'POST'])
# displays the data visualization
def home():
    return render_template('main.html', info = readStateByYear(state, year), dObj = getInfo(), year = year, state = state)

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
            s = float(s[1])
            tmp2.append(s)
        tmp.append(tmp2)
    return tmp
    
@app.route("/info/", methods=['GET'])
def returnInfo():
    state = request.args.get('s')
    year = request.args.get('y')
    print state
    print year
    return render_template('stats.html', info = readStateByYear(state, year))
#    return render_template('main.html', info = readStateByYear(state, year))

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

@app.route("/go/", methods=['POST'])
def go():
    if (int(getYear()) < 2013):
        upYear()
    else:
        setYear("1977")
    return render_template('main.html', info = readStateByYear(state, year), dObj = getInfo(), year = year, state = state)

# returns year
def getYear():
    global year
    return year

# updates year
def setYear(y):
    global year
    year = y
    return year

# increments year by 1
def upYear():
    y = int(getYear())
    y += 1
    setYear(str(y))
    return y

print year
upYear()
print year

# returns state
def getState():
    global state
    return state

# updates state
def setState(s):
    global state
    state = s
    return state

if __name__ == "__main__":
    app.debug = True
    app.run()
