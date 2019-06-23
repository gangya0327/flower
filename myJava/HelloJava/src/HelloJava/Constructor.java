package HelloJava;

public class Constructor {
    String name = "yml";
    int age = 13;

    Constructor() {
        name = "peter";
        age = 16;
    }

    Constructor(String name1, int age1) {
        name = name1;
        age = age1;
    }

    public static void main(String[] args) {
        Constructor ons = new Constructor();
        System.out.println(ons.name);

        Constructor ons1 = new Constructor("raven", 18);
        System.out.println(ons1.name);
    }
}
