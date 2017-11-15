function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function decrease(id) {
    var number = parseInt(document.getElementById(id).innerHTML)
    if(number < 1) {
        document.getElementById(id).innerHTML = 0
    }
    else {
        number = number - 1
        document.getElementById(id).innerHTML = number
    }
}

function increase(id) {
    var number = parseInt(document.getElementById(id).innerHTML)
    if(number < 9) {
        number = number + 1
        document.getElementById(id).innerHTML = number
    }
    else {
        document.getElementById(id).innerHTML = 9
    }
}

function reset() {
    document.getElementById("numberOfMocha").innerHTML = 0
    document.getElementById("numberOfAmericano").innerHTML = 0
    document.getElementById("numberOfEspresso").innerHTML = 0
    document.getElementById("numberOfLatte").innerHTML = 0
    document.getElementById("numberOfMachhiato").innerHTML = 0
}

function order() {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.open("POST", "/order");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  var numberOfMocha = document.getElementById("numberOfMocha").innerHTML
  var numberOfAmericano = document.getElementById("numberOfAmericano").innerHTML
  var numberOfEspresso = document.getElementById("numberOfEspresso").innerHTML
  var numberOfLatte = document.getElementById("numberOfLatte").innerHTML
  var numberOfMachhiato = document.getElementById("numberOfMachhiato").innerHTML

  var json = { mocha: numberOfMocha, americano: numberOfAmericano, espresso: numberOfEspresso, latte: numberOfLatte, machhiato: numberOfMachhiato }

  xmlhttp.send(JSON.stringify(json));
}
