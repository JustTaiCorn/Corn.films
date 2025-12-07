import ItemCategory from "./ItemCategory"

function CategoryGrid({ items }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {items?.map((item, index) => (
                <div key={index}>
                    <ItemCategory item={item} />
                </div >
            ))}
        </div>
    )
}

export default CategoryGrid