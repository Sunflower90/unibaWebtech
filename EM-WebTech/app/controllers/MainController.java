package controllers;

import models.Partie;
import models.Stadion;
import play.mvc.*;
import views.html.*;

public class MainController extends Controller {
	public Result showStartPage(){
		return ok(views.html.ourIndex.render("Korruptionssimulator", Partie.read(), Stadion.read()));
	}
	
	public Result showTimelinePage(){
		return ok(views.html.timeline.render("Korruptionssimulator - Timeline", Partie.read()));
	}
}
