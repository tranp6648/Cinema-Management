namespace ConsoleApp2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //cau 2
            int n = int.Parse(Console.ReadLine());

            for (int i = 0; i < n; i++)
            {
                Console.WriteLine("<div>");
                for (int j = 1; j < n; j++)
                {

                    Console.WriteLine("\t<div>");
                    Console.WriteLine("\t</div>");
                }

                Console.WriteLine("</div>");
                break;

            }


        }
    }
}
