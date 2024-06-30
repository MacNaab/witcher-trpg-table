export default function Heading({ children, level }: { children: React.ReactNode, level: number }) {
    if (level === 2) return <h2 className="text-4xl font-extrabold dark:text-white">{children}</h2>
    if (level === 3) return <h3 className="text-3xl font-bold dark:text-white">{children}</h3>
    return <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{children}</h1>
}