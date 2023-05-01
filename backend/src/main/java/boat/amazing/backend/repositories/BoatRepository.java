package boat.amazing.backend.repositories;

import boat.amazing.backend.entities.Boat;
import boat.amazing.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoatRepository extends JpaRepository<Boat, Long> {
    List<Boat> findAll();

    Boat findBoatById(Long id);
    void deleteBoatById(Long id);

    Boat save(Boat boat);
}