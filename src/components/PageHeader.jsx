const PageHeader = ({ title, description, action }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

      <div>
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      {action && (
        <div className="mt-3 md:mt-0">
          {action}
        </div>
      )}

    </div>
  )
}

export default PageHeader