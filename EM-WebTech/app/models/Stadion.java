package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.avaje.ebean.Model;

import play.data.validation.Constraints.Required;

@Entity
public class Stadion extends Model {
	@Id
	public Long sId;
	@Required
	public String name;
	@Required
	public String adresse;
	@Required
	public int seats;
	@Required
	public int gates;
	public String sponsor;
	@OneToMany(mappedBy="stadion", cascade=CascadeType.ALL)
	public List<Partie> partien;
	
	public static Finder<Long, Stadion> find = new Finder<Long, Stadion>(Stadion.class);
	
	public static void create(Stadion stadion) {
		stadion.save();
	}

	public static List<Stadion> read() {
		return find.all();
	}

	public static void update(Stadion updatedStadion) {
		updatedStadion.update();
	}

	public static void delete(Long sId) {
		find.ref(sId).delete();
	}


}
