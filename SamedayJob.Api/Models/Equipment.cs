namespace SamedayJob.Api.Models;

public class Equipment
{
    public int EquipmentID { get; set; }

    public int OwnerID { get; set; }
    public User Owner { get; set; }

    public string Name { get; set; }
    public decimal DailyPrice { get; set; }
    public bool IsAvailable { get; set; }
}
