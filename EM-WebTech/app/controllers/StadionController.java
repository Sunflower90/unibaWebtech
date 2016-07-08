package controllers;


//import com.google.inject.Inject;
 import javax.inject.Inject;

import models.Stadion;
import play.data.Form;
import play.data.FormFactory;
import play.mvc.Controller;
import play.mvc.Result;

public class StadionController extends Controller {

	@Inject
	private FormFactory formFactory;

	// Macht nur das Formular auf
	public Result create() {
		return ok(views.html.stadionForm.render("Create", formFactory.form(Stadion.class)));
	}

	public Result deleteStadion(Long id){
		return null;
	}
	public Result updateStadion(Long sId){
		Stadion stadion = Stadion.find.byId(sId);
		Form<Stadion> filledForm = formFactory.form(Stadion.class).fill(stadion);
		return null;

	}

	public Result storeStadion() {
		return null;
	}

	public Result readStadion() {
		return null;
	}

}
