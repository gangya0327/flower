package HelloJava;

public class Constant {
    public static void main(String[] args) {
        //常量有整数，小数，字符，字符串，布尔，null
        System.out.println(10.10);
        //字符常量，单引号下只能包含一个字符，多个字符（字符串）用双引号
        System.out.println('a');
        System.out.println("abc");
        //long 64位，int 32位，short 16位，
        // byte 8位，char 2位，
        // float 32位，double 64位
        System.out.println("a" + 1);
        System.out.println('a' + 1);
        System.out.println(1 + "a");

        //System.out.println(100/0); //异常
        System.out.println(100.0 / 0); //Infinity

        System.out.println("符号（正负）由前一个数决定 " + 10 % -3); //符号（正负）由前一个数决定
        System.out.println("符号（正负）由前一个数决定 " + -10 % -3); //符号（正负）由前一个数决定

        //a++不参与运算，++a参与运算
        int a = 3;
        int b = a++;
        System.out.println("b:" + b);
        int c = 3;
        int d = ++c;
        System.out.println("d:" + d);

        int e = 1;
        int f = (e++) + 5 + e;
        System.out.println("f:" + f + ", e:" + e);

        int g = 5;
        int h = (++g) + (g--) + 5 + g; //6+6+5+5


        short i = 4;
        //i = i + 2; 报错，i是short型，2是int型，
        i += 2; //i = (short)i + 2

        //与运算符 && 前者为假就不考虑后者
        System.out.println(true | false);
        System.out.println(true | true);

        int j = 3;
        int k = 4;
        if ((j > k & (j++) > k && (--k) < j) | (k++) <= (j--)) {
//            3 > 4 f---3,4
//                3 > 4 f---4,4
//                    //3 < 4 t---3,3 不会执行
//                f&f&&t f
//                    4 <= 4 f---5,3
            System.out.println("判断结果为true, j=" + j + ",k=" + k);
        } else {
            System.out.println("判断结果为false, j=" + j + ",k=" + k);
        }

    }
}
