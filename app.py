from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    chart_data = None
    years = None

    if request.method == "POST":
        mode = request.form["mode"]
        rate = float(request.form["rate"]) / 100
        period = int(request.form["period"])

        values = []
        years = list(range(0, period + 1))

        # FUTURE VALUE
        if mode == "fv":
            pv = float(request.form["value"])
            for t in years:
                values.append(pv * (1 + rate) ** t)
            result = values[-1]

        # PRESENT VALUE
        elif mode == "pv":
            fv = float(request.form["value"])
            pv = fv / (1 + rate) ** period
            for t in years:
                values.append(pv * (1 + rate) ** t)
            result = pv

        # ANUITAS
        elif mode == "annuity":
            payment = float(request.form["value"])
            total = 0
            values.append(0)

            for t in range(1, period + 1):
                total = total * (1 + rate) + payment
                values.append(total)

            result = total

        chart_data = json.dumps(values)

    return render_template(
        "index.html",
        result=result,
        chart_data=chart_data,
        years=years
    )

if __name__ == "__main__":
    app.run(debug=True)
