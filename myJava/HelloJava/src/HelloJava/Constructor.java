package HelloJava;

/**
 *
 * 状态和行为有类和对象之分
 * 在字段和方法前添加了static，则他们就属于类
 *
 * 特点
 * 1. satic修饰的内容，是随着类的加载而加载
 * 2. satic修饰的内容，优先于对象而存在
 * 3. satic修饰的内容，被该类型的所有对象共享
 * 4. satic修饰的内容，可以直接被类名调用
 *
 * 静态方法只能访问静态成员
 */
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
