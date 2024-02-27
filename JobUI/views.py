from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.db import IntegrityError

from django.contrib.auth.models import User

def app(request):

    if request.user.is_authenticated:
        return render(request, "JobUI/app_template.html")

    else:
        return HttpResponseRedirect(reverse("login"))
    

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("app"))
        else:
            return render(request, "JobUI/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "JobUI/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("app"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "JobUI/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError as error:
            print(error)
            return render(request, "JobUI/register.html", {
                "message": "Account already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("app"))
    else:
        return render(request, "JobUI/register.html")
