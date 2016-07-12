package controllers;


//import com.google.inject.Inject;
 import javax.inject.Inject;

import models.Partie;
import models.Stadion;
import play.data.Form;
import play.data.FormFactory;
import play.mvc.Controller;
import play.mvc.Result;

public class StadionController extends Controller {

	@Inject
	private FormFactory formFactory;

	// Macht nur das Formular auf
	public Result createStadion() {
		return ok(views.html.stadionForm.render("Create", formFactory.form(Stadion.class)));
	}
	
	public Result showStadionDeletionConfirmation(Long sId){
		return ok(views.html.confirmStadionDeletion.render(sId));
	}

	public Result deleteStadion(Long id){
		Stadion.delete(id);
		return redirect(routes.MainController.showStartPage());
	}
	public Result updateStadion(Long sId){
		Stadion stadion = Stadion.find.byId(sId);
		Form<Stadion> filledForm = formFactory.form(Stadion.class).fill(stadion);
		return ok(views.html.stadionForm.render("Update", filledForm));

	}

	public Result storeStadion() {
		Form<Stadion> stadionForm = formFactory.form(Stadion.class);
		Form<Stadion> filledForm = stadionForm.bindFromRequest();
		if (filledForm.hasErrors()){
			return ok(views.html.stadionForm.render("Correct", filledForm));
		} else{
			Stadion stadion = filledForm.get();
			
			// id anlegen
			if (stadion.sId == null){
				Stadion.create(stadion);
			} else {
			 Stadion.update(stadion);
			}
			return redirect(routes.MainController.showStartPage());
		}
			
	}


}
