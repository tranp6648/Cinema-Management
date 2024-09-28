using System;
using System.Collections;
using System.Collections.Generic;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int a = 5;
            int b = 4;
            
            Console.WriteLine(++b);
        }
    }

    class a : IEnumerable<int>
    {
        public int a1 = 10;
        public int b = 20;
        private int c = 30; // Đặt giá trị cho c

        // Phương thức để trả về một enumerator
        public IEnumerator<int> GetEnumerator()
        {
            yield return a1;
            yield return b;
            yield return c; // Nếu bạn muốn cho c vào
        }

        // Phương thức này cần thiết cho IEnumerable
        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
