package controllers;

import javax.inject.Inject;

import models.Partie;
import models.Stadion;
import play.data.FormFactory;
import play.mvc.Controller;
import play.mvc.Result;

public class PartieController extends Controller{
//	@Inject
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
	
	public Result updatePartie(Long pId){
		return null;
	}
	
	public Result deletePartie(Long pId){
		return null;
	}
	
	public Result storePartie(){
		return null;
	}
	
}
