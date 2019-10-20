package _01面向对象.This;

public class User {
    String name;
    int age;

    /*
    在一个方法中，给变量赋值，会先到方法中找有没有该变量
    如果有就给方法内部变量赋值，否则就去上一级找

    在方法中加上this，就会去对象中找该变量赋值
    this：当前使用的对象的地址

    区分成员变量和局部变量的二异性，必须要使用this
    在同类中，实例方法调用，其实也有this，但可以省略
    可以当做参数传递
    可以当做返回值
    static不能与this同用
    构造器的重载互调，this(); this代表的是当前的构造器名，必须写到第一行
     */

    User(String name) {
        this.name = name;
    }

    User(String name, int age) {
//        this.name = name;
        this(name);
        this.age = age;
    }

    void say() {
        System.out.println("我叫" + this.name);
    }

    void sayHello() {
        this.say();
    }

    public static void main(String[] args) {
        User user1 = new User("zs", 10);
        System.out.println(user1.name);
        System.out.println(user1.age);

        User user2 = new User("ls", 20);
        user2.sayHello();
    }
}