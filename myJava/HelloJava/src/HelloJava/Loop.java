package HelloJava;

public class Loop {
    public static void main(String[] args) {
        for (int line = 0; line < 3; line++) {
            for (int l = 0; l < 5; l++) {
                System.out.print("*");
            }
            System.out.print("\n");
        }

        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                if (i == 7) {
                    break;
                }
                if (i == 3) {
                    continue;
                }
                System.out.print(j + "*" + i + "=" + i * j + "\t");
            }
            System.out.println();
        }

        int countEven = 0;
        for (int i = 1; i <= 100; i++) {
            if (countEven >= 5) {
                break;
            }
            if (i % 2 == 0) {
                System.out.print(i + ",");
                countEven++;
            }
        }
    }
}
