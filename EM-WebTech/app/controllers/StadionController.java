package controllers;

import com.google.inject.Inject;

import models.Stadion;
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

	public Result delete(Long id) {
		return null;
	}

	public Result updateStadion(Long sId) {
		return null;

	}

	public Result storeStadion() {
		return null;
	}

	public Result readStadion() {
		return null;
	}

}
