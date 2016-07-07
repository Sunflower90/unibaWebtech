package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.avaje.ebean.Model;

import play.data.validation.Constraints.Required;

@Entity
public class Partie extends Model{
	
	@Id
	public Long pId;
	@Required
	@ManyToOne
	public Stadion stadion;
	@Required
	public String host;
	@Required
	public String guest;	
	@Required
	public String date;
	
	public static Finder<Long, Partie> find = new Finder<Long, Partie>(Partie.class);
	

	public static void create(Partie partie) {
		partie.save();
	}

	public static List<Partie> read() {
		return find.all();
	}

	public static void update(Partie updatedPartie) {
		updatedPartie.update();
	}

	public static void delete(Long pId) {
		find.ref(pId).delete();
	}

	
}
