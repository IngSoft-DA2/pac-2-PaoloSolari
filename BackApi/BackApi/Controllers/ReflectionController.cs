using IImporter;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        private readonly ILogger<ReflectionController> _logger;
        private readonly string _reflectionDirectory;

        public ReflectionController(ILogger<ReflectionController> logger)
        {
            _logger = logger;
            _reflectionDirectory = Path.Combine(AppContext.BaseDirectory, "reflection");
        }

        [HttpGet("importers")]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<string>> GetImporters()
        {
            if (!Directory.Exists(_reflectionDirectory))
            {
                return Ok(Array.Empty<string>());
            }

            var importerAssemblies = new List<string>();

            foreach (var dllPath in Directory.EnumerateFiles(_reflectionDirectory, "*.dll", SearchOption.TopDirectoryOnly))
            {
                Console.WriteLine(dllPath);
                try
                {
                    var assembly = Assembly.LoadFrom(dllPath);
                    var hasImporter = assembly
                        .GetTypes()
                        .Any(type =>
                            type.IsClass &&
                            type.IsPublic &&
                            !type.IsAbstract &&
                            typeof(ImporterInterface).IsAssignableFrom(type));

                    if (hasImporter)
                    {
                        importerAssemblies.Add(Path.GetFileName(dllPath));
                    }
                }
                catch (ReflectionTypeLoadException ex)
                {
                    _logger.LogWarning(ex, "Unable to inspect types for assembly {AssemblyPath}", dllPath);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Unable to load assembly {AssemblyPath}", dllPath);
                }
            }

            return Ok(importerAssemblies);
        }
    }
}
