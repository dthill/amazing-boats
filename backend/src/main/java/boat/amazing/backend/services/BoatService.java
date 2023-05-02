package boat.amazing.backend.services;

import boat.amazing.backend.dto.UserDto;
import boat.amazing.backend.dto.UserRegistrationDto;
import boat.amazing.backend.entities.Boat;
import boat.amazing.backend.entities.User;
import boat.amazing.backend.repositories.BoatRepository;
import boat.amazing.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class BoatService {
    private final BoatRepository boatRepository;

    @Autowired
    public BoatService(BoatRepository boatRepository) {
        this.boatRepository = boatRepository;
    }

    @Transactional
    public Boat saveBoat(Boat boat) {
        return boatRepository.save(boat);
    }

    @Transactional
    public void deleteBoat(long id) {
        boatRepository.deleteBoatById(id);
    }

    public Boat getBoat(Long id){
        return boatRepository.findBoatById(id);
    }


    public List<Boat> findAll() {
        return boatRepository.findAll();
    }

}
