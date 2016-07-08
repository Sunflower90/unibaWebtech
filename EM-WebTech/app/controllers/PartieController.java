package controllers;

import javax.inject.Inject;

import models.Partie;
import models.Stadion;
import play.data.Form;
import play.data.FormFactory;
import play.mvc.Controller;
import play.mvc.Result;

public class PartieController extends Controller{
	@Inject
	private FormFactory formFactory;
	/**
	 * Only returns the create PAGE, does not create the object!
	 * @return
	 */
	public Result createPartie(){
		return ok(views.html.partieForm.render("Create", formFactory.form(Partie.class), Stadion.read()));
	}

	public Result readPartie(){
		return null;
	}
	
	
	/**
	 * Just returns the PAGE to update, does not update the Data in the Database
	 * @param pId
	 * @return
	 */
	public Result updatePartie(Long pId){
		Partie partie = Partie.find.byId(pId);
		Form<Partie> filledForm = formFactory.form(Partie.class).fill(partie);
		return ok(views.html.partieForm.render("Update", filledForm, Stadion.read()));
	}
	
	public Result deletePartie(Long pId){
		Partie.delete(pId);
		return redirect(routes.MainController.showStartPage());
	}
	
	public Result storePartie(){
		Form<Partie> partieForm = formFactory.form(Partie.class);
		Form<Partie> filledForm = partieForm.bindFromRequest();
		if (filledForm.hasErrors()){
			return ok(views.html.partieForm.render("Correct", filledForm, Stadion.read()));
		} else {
			Partie partie = filledForm.get();
			if (partie.pId == null){
				Partie.create(partie);
			} else {
				Partie.update(partie);
			}
		}
		return redirect(routes.MainController.showStartPage());
	}
	
}
