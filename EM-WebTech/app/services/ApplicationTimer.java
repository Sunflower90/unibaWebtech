package services;

import java.time.Clock;
import java.time.Instant;
import java.util.concurrent.CompletableFuture;
import javax.inject.*;

import models.Stadion;
import play.Logger;
import play.inject.ApplicationLifecycle;

/**
 * This class demonstrates how to run code when the
 * application starts and stops. It starts a timer when the
 * application starts. When the application stops it prints out how
 * long the application was running for.
 *
 * This class is registered for Guice dependency injection in the
 * {@link Module} class. We want the class to start when the application
 * starts, so it is registered as an "eager singleton". See the code
 * in the {@link Module} class to see how this happens.
 *
 * This class needs to run code when the server stops. It uses the
 * application's {@link ApplicationLifecycle} to register a stop hook.
 */
@Singleton
public class ApplicationTimer {

    private final Clock clock;
    private final ApplicationLifecycle appLifecycle;
    private final Instant start;

    @Inject
    public ApplicationTimer(Clock clock, ApplicationLifecycle appLifecycle) {
        this.clock = clock;
        this.appLifecycle = appLifecycle;
        // This code is called when the application starts.
        start = clock.instant();
        Logger.info("ApplicationTimer demo: Starting application at " + start);
        
        
        // TODO Hier die drei Stadien und Patien anlegen
        Stadion meinStadion = new Stadion();
        meinStadion.name = "Mein Stadion";
        meinStadion.adresse = "Irgendwo im Nirgendwo";
        meinStadion.gates = 3;
        meinStadion.seats = 5000;
        meinStadion.sponsor = "Mein Sponsor";
        Stadion.create(meinStadion);
        
        Stadion deinStadion = new Stadion();
        deinStadion.name = "Dein Stadion";
        deinStadion.adresse = "Dort, wo der Pfeffer wächst";
        deinStadion.gates = 25;
        deinStadion.seats = 15000;
        deinStadion.sponsor = "Spicy Pepper Company";
        Stadion.create(deinStadion);
        
        Stadion unserStadion = new Stadion();
        unserStadion.name = "Unser Stadion";
        unserStadion.adresse = "Hinter dem Mond";
        unserStadion.gates = 42;
        unserStadion.seats = 4200;
        unserStadion.sponsor = "Moonlight Esoterics Inc.";
        

        // When the application starts, register a stop hook with the
        // ApplicationLifecycle object. The code inside the stop hook will
        // be run when the application stops.
        appLifecycle.addStopHook(() -> {
            Instant stop = clock.instant();
            Long runningTime = stop.getEpochSecond() - start.getEpochSecond();
            Logger.info("ApplicationTimer demo: Stopping application at " + clock.instant() + " after " + runningTime + "s.");
            return CompletableFuture.completedFuture(null);
        });
    }

}
