package controllers;

import java.util.Date;
import java.util.List;

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
		return ok(views.html.partieForm.render("Update Partie", filledForm, Stadion.read()));
	}
	
	public Result showPartieDeletionConfirmation(Long pId){
		return ok(views.html.confirmPartieDeletion.render(pId));
	}
	
	public Result deletePartie(Long pId){
		Partie.delete(pId);
		return redirect(routes.MainController.showStartPage());
	}
	
	public Result storePartie(){
		Form<Partie> partieForm = formFactory.form(Partie.class);
		Form<Partie> filledForm = partieForm.bindFromRequest();
		if (filledForm.hasErrors()){
			return ok(views.html.partieForm.render("Input had errors: Please Correct Partie", filledForm, Stadion.read()));
		} else if (partieAtSameDateInSameStadionAlreadyExists(Partie.read(), filledForm.get().date, filledForm.get().stadion.sId)){
			return ok(views.html.partieForm.render("A game cannot take place at that date and time, there is already a game, please change date or Stadium", filledForm, Stadion.read()));
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
	
	private boolean partieAtSameDateInSameStadionAlreadyExists(List<Partie> partien, Date date, long sId){
		for (Partie partie : partien){
			if(date.equals(partie.date) && sId == partie.stadion.sId ){
				return true;
			}
		}
		return false;
	}
	
}
