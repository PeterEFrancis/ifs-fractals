from flask import Flask, render_template, url_for, redirect, request, jsonify
import re
import random as r
import html
import os
import time

import hashlib


import gspread
from oauth2client.service_account import ServiceAccountCredentials
import googleapiclient.discovery
from googleapiclient.http import MediaFileUpload



app = Flask(__name__)
app.secret_key = "ZpWNmtZBqTeLrJu6SWx6BueHGKWYxfD4fLz7CKTfcerZj4ffVhEG"

# heroku = Heroku(app)
app.config['SECRET_KEY'] = 'secret!'







 #      _       _        _
 #   __| | __ _| |_ __ _| |__   __ _ ___  ___
 #  / _` |/ _` | __/ _` | '_ \ / _` / __|/ _ \
 # | (_| | (_| | || (_| | |_) | (_| \__ \  __/
 #  \__,_|\__,_|\__\__,_|_.__/ \__,_|___/\___|
 #




# Connect to Google Sheets
scope = [
    'https://www.googleapis.com/auth/spreadsheets',
    "https://www.googleapis.com/auth/drive"
]

cred_loc = '' if os.getcwd()[1:].split("/")[0] == 'Users' else '/etc/secrets/'

credentials = ServiceAccountCredentials.from_json_keyfile_name(cred_loc + "credentials.json", scope)
client = gspread.authorize(credentials)
service = googleapiclient.discovery.build('drive', 'v3', credentials=credentials)



DATABASE_NAME = "ifs-fractals"


def initialize():
    db = client.create(DATABASE_NAME)
    db.share('peter.e.francis.databases@gmail.com', perm_type='user', role='writer')
    return None


local_data = {}

def check_local_data_up_to_date(name):
    return name in local_data and time.time() - local_data[name]['time'] <= 1

def get_local_data(name):
    return local_data[name]['data']

def set_local_data(name, data):
    local_data[name] = {
        'data': data,
        'time': time.time()
    }
    return None







def get_sheet(sheet_name):
    if not check_local_data_up_to_date('sheet-' + sheet_name):
        set_local_data('sheet-' + sheet_name, client.open(DATABASE_NAME).worksheet(sheet_name))
    return get_local_data('sheet-' + sheet_name)

def get_sheet_keys(sheet_name):
    return get_sheet(sheet_name).row_values(1)

def row_dict_to_arr(sheet_name, row_dict):
    return [row_dict[key] if key in row_dict else "" for key in get_sheet_keys(sheet_name)]

def update_row(sheet_name, row_dict):
    '''
        looks for row with id == row_dict['id']
        if row_dict['id'] is None or no matching id is found, then adds a row
        otherwise, update
    '''

    sheet = get_sheet(sheet_name)

    loc = sheet.find(str(row_dict['id']))
    if loc is None or loc.col != get_sheet_keys(sheet_name).index('id') + 1:
        sheet.append_row(row_dict_to_arr(sheet_name, row_dict))
    else:
        for col, key in enumerate(get_sheet_keys(sheet_name)):
            if key in row_dict:
                sheet.update_cell(loc.row, col + 1, row_dict[key])

    return None

def get_next_id(sheet_name):
    sheet = get_sheet(sheet_name)
    return int(sheet.cell(sheet.row_count, 1).value) + 1











def get_playgrounds():
    if not check_local_data_up_to_date('playgrounds'):
        set_local_data('playgrounds', get_sheet('playgrounds').get_all_records())
    return get_local_data('playgrounds')


def process(p):
    p['center'] = eval(p['center'])
    p['vars'] = eval(p['vars'])
    p['weights'] = eval(p['weights'])
    return p

def get_playground(playground_id):
    q = list(filter(lambda x: x['id'] == playground_id, get_playgrounds()))
    if len(q) > 0:
        return True, process(q[0])
    return False, None


def save(title, transformations, weights, vars, zoom, center, points, color):
    playground = {
        'id': get_next_id('playgrounds'),
        'title': title,
        'transformations': transformations,
        'weights': weights,
        'vars': vars,
        'zoom': zoom,
        'center': center,
        'points': points,
        'color': color
    }
    update_row('playgrounds', playground)

    return playground['id']



def delete_playground(playground_id):
    playgrounds = get_sheet('playgrounds')
    row = playgrounds.col_values(1).index(playground_id) + 1
    playgrounds.delete_row(row)
    return None







#                  _             _
#   ___ ___  _ __ | |_ ___ _ __ | |_
#  / __/ _ \| '_ \| __/ _ | '_ \| __|
# | (_| (_) | | | | ||  __| | | | |_
#  \___\___/|_| |_|\__\___|_| |_|\__|



def get_navbar(active=None):
    return render_template('navbar.html', active=active)



@app.route('/')
def index():
    return render_template('index.html', navbar=get_navbar())


@app.route('/math')
def math():
    return render_template('math.html', navbar=get_navbar('math'))



@app.route('/playground')
@app.route('/playground/')
def playground():
    return redirect('/playground/1')


@app.route('/playground/<int:playground_id>')
def playground_saved(playground_id):
    is_p, p = get_playground(playground_id)
    if is_p:
        return render_template(
            'playground.html',
            playground=p,
            navbar=get_navbar('playground')
        ), 200
    else:
        return "no playground found", 404


@app.route('/word-fractals')
@app.route('/word-fractals/<string:word>')
def word_fractal(word='Fractal'):
    return render_template(
        'word-fractals.html',
        word=word,
        navbar=get_navbar('word-fractals')
    )




@app.route('/saved')
def saved():
    return render_template(
        'saved.html',
        all=[process(p) for p in get_playgrounds()],
        navbar=get_navbar('saved')
    )



@app.route('/playground/t=<string:transformations>/w=<string:weights>')
def m(transformations, weights):
    playground_id = save(f'myImportedFractal', transformations, '[' + weights + ']', "{}", "auto", '{"x":0,"y":0}', "10000", "#000000")
    return redirect('/playground/' + str(playground_id))


@app.route('/random/<int:num>')
def random(num):
    # create transformations
    transformations = ''
    vars = '{'
    for i in range(num):
        b = round(r.random(),2)
        c = 0
        while c == 0:
            c = round(r.random(),2)
        f = ((1 - c**2) * (1 - b**2) / (c**2))**(1/2)
        a = round((r.random() - 0.5) * 2 * f, 3)
        while a**2 * c**2 >= (1 - b**2) * (1 - c**2):
            a -= 0.01 * (1 if a > 0 else -1)
        theta = round(6.283185307179586 * r.random(),2)
        h = round(r.random(),2)
        k = round(r.random(),2)
        v = [a, b, c, theta, h, k]
        if i < 26:
            letter = 'abcdefghijklmnopqrstuvwxyz'[i]
            replaced = r.randint(0,5)
            replaced_val = v[replaced]
            v[replaced] = letter
            vars += '"' + letter + '":{"val":' + str(replaced_val) + ',"min":-1,"max":1,"step":0.1},'
        t = f'Translate({v[4]},{v[5]})'
        t += f'Rotate({v[3]})'
        t += f'XShear({v[0]})'
        t += f'XYScale({v[1]},{v[2]})'
        transformations += t
        if i < num - 1:
            transformations += '&'
    vars = vars[:-1] + "}"

    playground = {
        'id': '',
        'title': '',
        'transformations': transformations,
        'weights': [1] * num,
        'vars': eval(vars),
        'zoom': 'auto',
        'center': '{"x":0,"y":0}',
        'points': "10000",
        'color': "#000000"
    }

    return render_template(
        'playground.html',
        playground=playground,
        navbar=get_navbar('playground')
    )



@app.route('/python')
def python_docs():
    return render_template(
        'python.html', 
        navbar=get_navbar('python')
    )


@app.route('/forum')
def forum():
    return render_template(
        'forum.html', 
        navbar=get_navbar('forum')
    )





@app.route('/sandbox')
def sandbox():
    return render_template(
        'sandbox.html',
        navbar=get_navbar('sandbox')
    )


@app.route('/comb')
def comb():
    return render_template('comb.html')


@app.route('/dimension')
def dimension():
    return redirect('/math')
    # return render_template('dimension.html', navbar=get_navbar())















#    __ _  ___ ___ ___ ___ ___
#   / _` |/ __/ __/ _ / __/ __|
#  | (_| | (_| (_|  __\__ \__ \
#   \__,_|\___\___\___|___|___/




@app.route('/save_playground', methods=['POST'])
def save_playground():
    if request.method == 'POST':
        title = request.form['title']
        transformations = request.form['transformations']
        weights = request.form['weights']
        vars = request.form['vars']
        zoom = request.form['zoom']
        center = request.form['center']
        points = request.form['points']
        color = request.form['color']
        id = save(title, transformations, weights, vars, zoom, center, points, color)
        return jsonify({'success':'true', 'id':id})
    return 'Access Denied'




@app.route('/db/<int:playground_id>', methods=['POST'])
def database(playground_id):
    if request.method == 'POST':
        is_p, p = get_playground(playground_id)
        if is_p:
            return p, 200
        return "no such playground", 200
    return 'Access Denied', 403











 #            _           _
 #   __ _  __| |_ __ ___ (_)_ __
 #  / _` |/ _` | '_ ` _ \| | '_ \
 # | (_| | (_| | | | | | | | | | |
 #  \__,_|\__,_|_| |_| |_|_|_| |_|


# @app.route('/admin')
# def admin():
#     return render_template('admin.html')


def SHA1(string):
    return hashlib.sha1(string.encode()).hexdigest()


@app.route('/delete', methods=['POST'])
def delete():
    if request.method == 'POST':
        if SHA1(request.form['password']) == 'b4f80cab78bff6f46cf0288aacdb548a24dd5f69':
            names = request.form['names'].split(',')
            for name in names:
                delete_playground(name)
            return jsonify({"success":"true"})
        else:
            return jsonify({"success":"false", "error":"incorrect password"})
    else:
        return 'Access Denied'



 #   __ _ _ __  _ __    _ __ _   _ _ __
 #  / _` | '_ \| '_ \  | '__| | | | '_ \
 # | (_| | |_) | |_) | | |  | |_| | | | |
 #  \__,_| .__/| .__/  |_|   \__,_|_| |_|
 #       |_|   |_|


if __name__ == "__main__":
    app.run(port=8001)
