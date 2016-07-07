package controllers;

import play.mvc.*;
import views.html.*;

public class MainController extends Controller {
	public Result showStartPage(){
		return ok(views.html.ourIndex.render("Korruptionssimulator"));
	}
}
