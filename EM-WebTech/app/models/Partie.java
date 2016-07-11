package models;

import java.time.Period;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

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
	public Date date;
	
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
	
	public String getPeriod(){
		long difference = date.getTime() - System.currentTimeMillis();
		return getDurationBreakdown(difference);
	}
	
	
	 private static String getDurationBreakdown(long millis)
	    {
	        if(millis < 0)
	        {
	            throw new IllegalArgumentException("Duration must be greater than zero!");
	        }

	        long days = TimeUnit.MILLISECONDS.toDays(millis);
	        millis -= TimeUnit.DAYS.toMillis(days);
	        long hours = TimeUnit.MILLISECONDS.toHours(millis);
	        millis -= TimeUnit.HOURS.toMillis(hours);
	        long minutes = TimeUnit.MILLISECONDS.toMinutes(millis);
	        millis -= TimeUnit.MINUTES.toMillis(minutes);
	        long seconds = TimeUnit.MILLISECONDS.toSeconds(millis);

	        StringBuilder sb = new StringBuilder(64);
	        sb.append(days);
	        sb.append(" Days ");
	        sb.append(hours);
	        sb.append(" Hours ");
	        sb.append(minutes);
	        sb.append(" Minutes ");
	        sb.append(seconds);
	        sb.append(" Seconds");

	        return(sb.toString());
	    }

	
}
