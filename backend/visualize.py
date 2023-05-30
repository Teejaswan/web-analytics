import matplotlib.pyplot as plt
import json

data_file = open(
    '/Users/raja/Projects/kct/DSA/web-analytics/backend/data.json')

data_json = json.load(data_file)

fig = plt.figure()

def visualize(x, y, name, ax):
    ax.scatter(x, y, c='blue', marker="o", s=10)
    ax.set_title(name)
    plt.xlabel('X')
    plt.ylabel('Y')


def cursor():
    cursor_coords = data_json['cursor']
    x = []
    y = []
    for i in range(len(cursor_coords)):
        x.append(cursor_coords[i][0])
        y.append(-cursor_coords[i][1])

    visualize(x, y, 'Cursor', fig.add_subplot(121))


def click():
    click_coords = data_json['clicks']
    x = []
    y = []
    for i in range(len(click_coords)):
        x.append(click_coords[i][0])
        y.append(-click_coords[i][1])

    visualize(x, y, 'Click', fig.add_subplot(122))


cursor()
click()
plt.show()
