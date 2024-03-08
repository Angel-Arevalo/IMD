import java.util.Scanner;

public class Calculus { 
    public static Scanner Input = new Scanner(System.in);
    public static void main(String[] args) {

        Calculus def = new Calculus();
        System.out.println("!Hello world!, This program calcule the volume of a hollow cylindrus and cone,\nyou must input firts the Radius and after the Heigth.\n");
        System.out.println("Do yout want calculate the volume of a hollow cylindrus or a cone? (1 to cone, 2 to hollow)");
        int cin = Calculus.Input.nextInt();

        if (cin == 1) {
            System.out.println("You have choose a Cone");
            Cone cone = new Cone();
            def.Cin(cone);
            System.out.printf("The volume of the Cone is: %6.8f", Cone.VolumeCone(cone.GetRadius(), cone.GetHeigth()));
        }else if (cin == 2) {
            System.out.println("You have choose a Cone");
            Cone HllwBig = new Cone();// hll abbreviates hollow
            Cone HllwSmall = new Cone();
            System.out.println("You are setting the first Cylindrus");
            def.Cin(HllwBig);
            System.out.println("You are setting the Second Cylindrus");
            def.Cin(HllwSmall);

            double FirstHelp = Cone.VolumeHllw(HllwBig.GetRadius(), HllwBig.GetHeigth());
            double SecondtHelp = Cone.VolumeHllw(HllwSmall.GetRadius(), HllwSmall.GetHeigth());
            double HelpDefini = FirstHelp - SecondtHelp;

            if (HelpDefini < 0) {
                HelpDefini *= -1;
            }

            System.out.printf("The volume of the Cone is: %f", HelpDefini);
        }
    }

    void Cin(Cone cone) {
        double x = Calculus.Input.nextDouble(); 
        double y = Calculus.Input.nextDouble();
        cone.SetRadius(x); cone.SetHeigth(y);
    }
}

class Cone {
    private double Radius, Heigth;//Variables
    
    //Constructor
    public Cone() {
        Radius = 1;
        Heigth = 0;
    }

    public double GetRadius() {//Metod to obtain the Radius
        return Radius;
    }

    public double GetHeigth() {//Metod to get the Heigth
        return Heigth;
    }

    public void SetRadius(double Radius) {//Metod to change the Radius
        this.Radius = Radius;
    }
    public void SetHeigth(double Heigth) {//Metod to set the Heigth
        this.Heigth = Heigth;
    }

    public static double VolumeCone(double Radius, double Heigth) {//Metod to know the volume of a cone
        double base = Math.pow(Radius,2)*Math.PI;

        return (base*Heigth)*(1./3);
    }

    public static double VolumeHllw(double Radius, double Heigth) {//Metod to know the volume of a hollow Cylindrus 
        double base = Math.pow(Radius,2)*Math.PI;

        return (base*Heigth);
    }
}