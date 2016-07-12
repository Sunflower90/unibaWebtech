package controllers;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import models.Partie;
import models.Stadion;
import play.mvc.*;
import views.html.*;

public class MainController extends Controller {
	public Result showStartPage(){
		return ok(views.html.ourIndex.render("Korruptionssimulator", Partie.read(), Stadion.read()));
	}
	
	public Result showTimelinePage(){
		return ok(views.html.timeline.render("Korruptionssimulator - Timeline", sortPartien(Partie.read())));
	}
	
	private List<Partie> sortPartien(List<Partie> unsorted){
		 Collections.sort(unsorted, new Comparator<Partie>() {
			  public int compare(Partie p1, Partie p2) {
				  return p1.date.compareTo(p2.date);
			  }
			});
		 return unsorted;
		
	}
}
