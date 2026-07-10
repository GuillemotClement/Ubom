@Entity
@Table(name = "asset")
public class Asset {
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
}