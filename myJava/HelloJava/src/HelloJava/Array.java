package HelloJava;

public class Array {
    public static void main(String[] args) {
        int[] ages = new int[]{20, 23, 28};
        String[] names; //先定义，后赋值
        names = new String[]{"amy", "jack", "peter"};
        System.out.println(ages[1] + ": " + names[2]);

        int[] allPerson = new int[10]; //动态赋值，不知道内容，先定义数组空间大小
        allPerson[0] = 24;
        allPerson[1] = 19;
        allPerson[2] = 18;
        allPerson[3] = 18;
        allPerson[9] = 28;
        //allPerson[10] = 38; //ArrayIndexOutOfBoundsException 数组越界
        System.out.println(allPerson.length);
        for (int i = 0; i < allPerson.length; i++) {
            System.out.print(allPerson[i] + " ");
        }
        System.out.println();

        String[] array = new String[]{"xh", "xm", "ff", "mk", "pt", "ui", "de", "pw"};
        printArray(array);
        printReverseArray(array);

        int[][] twoArray = new int[][]{
                {5, 6, 7, 8},
                {2, 3, 4, 5},
                {9, 0, 1}
        };
        System.out.println(twoArray[2][0]);
//        System.out.println(twoArray[2][3]);

        arraySum(ages);
        variableSum(1,2,3,4,5);
    }

    static void printArray(String[] array) {
        String res = "[";
        for (int i = 0; i < array.length; i++) {
            res += "\"" + array[i] + "\"";
            if (i == array.length - 1) {
                break;
            }
            res += ",";
        }
        res += "]";
        System.out.println(res);
    }

    static void printReverseArray(String[] array) {
        String res = "[";
        for (int i = array.length - 1; i >= 0; i--) {
            res += "\"" + array[i] + "\"";
            if (i == 0) {
                break;
            }
            res += ",";
        }
        res += "]";
        System.out.println(res);
    }

    static void arraySum(int[] arr) {
        int sum = 0;
//        for (int i = 0; i < arr.length; i++) {
//            sum += arr[i];
//        }
        for (int j :
                arr) {
            sum += j;
        }
        System.out.println("arraySum " + sum);
    }
    static void variableSum(int...args){
        int sum = 0;
        for (int i = 0; i < args.length; i++) {
            sum += args[i];
        }
        System.out.println("variableSum " + sum);
    }

}
