namespace SamedayJob.Api.DTOs.UserDto;

public class EquipmentDto
{
    public int EquipmentID { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal DailyPrice { get; set; }
    public bool IsAvailable { get; set; }
}