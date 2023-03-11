from _typeshed import Incomplete
from collections.abc import Iterator
from typing import Any

from pkg_resources import Environment
from setuptools import Command, SetuptoolsDeprecationWarning

class easy_install(Command):
    description: str
    command_consumes_arguments: bool
    user_options: Any
    boolean_options: Any
    negative_opt: Any
    create_index: Any
    user: int
    zip_ok: Any
    install_dir: Any
    index_url: Any
    find_links: Any
    build_directory: Any
    args: Any
    optimize: Any
    upgrade: Any
    editable: Any
    root: Any
    version: Any
    install_purelib: Any
    install_platlib: Any
    install_headers: Any
    install_lib: Any
    install_scripts: Any
    install_data: Any
    install_base: Any
    install_platbase: Any
    install_userbase: Any
    install_usersite: Any
    no_find_links: Any
    package_index: Any
    pth_file: Any
    site_dirs: Any
    installed_projects: Any
    verbose: Any
    def initialize_options(self) -> None: ...
    def delete_blockers(self, blockers) -> None: ...
    config_vars: Any
    script_dir: Any
    all_site_dirs: Any
    shadow_path: Any
    local_index: Any
    outputs: Any
    def finalize_options(self) -> None: ...
    def expand_basedirs(self) -> None: ...
    def expand_dirs(self) -> None: ...
    def run(self, show_deprecation: bool = ...) -> None: ...
    def pseudo_tempname(self): ...
    def warn_deprecated_options(self) -> None: ...
    def check_site_dir(self) -> None: ...
    def cant_write_to_target(self) -> None: ...
    def check_pth_processing(self): ...
    def install_egg_scripts(self, dist) -> None: ...
    def add_output(self, path) -> None: ...
    def not_editable(self, spec) -> None: ...
    def check_editable(self, spec) -> None: ...
    def easy_install(self, spec, deps: bool = ...): ...
    def install_item(self, spec, download, tmpdir, deps, install_needed: bool = ...): ...
    def select_scheme(self, name) -> None: ...
    def process_distribution(self, requirement, dist, deps: bool = ..., *info) -> None: ...
    def should_unzip(self, dist): ...
    def maybe_move(self, spec, dist_filename, setup_base): ...
    def install_wrapper_scripts(self, dist) -> None: ...
    def install_script(self, dist, script_name, script_text, dev_path: Incomplete | None = ...) -> None: ...
    def write_script(self, script_name, contents, mode: str = ..., blockers=...) -> None: ...
    def install_eggs(self, spec, dist_filename, tmpdir): ...
    def egg_distribution(self, egg_path): ...
    def install_egg(self, egg_path, tmpdir): ...
    def install_exe(self, dist_filename, tmpdir): ...
    def exe_to_egg(self, dist_filename, egg_tmp): ...
    def install_wheel(self, wheel_path, tmpdir): ...
    def installation_report(self, req, dist, what: str = ...): ...
    def report_editable(self, spec, setup_script): ...
    def run_setup(self, setup_script, setup_base, args) -> None: ...
    def build_and_install(self, setup_script, setup_base): ...
    def update_pth(self, dist) -> None: ...
    def unpack_progress(self, src, dst): ...
    def unpack_and_compile(self, egg_path, destination): ...
    def byte_compile(self, to_compile) -> None: ...
    def create_home_path(self) -> None: ...
    INSTALL_SCHEMES: Any
    DEFAULT_SCHEME: Any

def extract_wininst_cfg(dist_filename): ...
def get_exe_prefixes(exe_filename): ...

class PthDistributions(Environment):
    dirty: bool
    filename: Any
    sitedirs: Any
    basedir: Any
    def __init__(self, filename, sitedirs=...) -> None: ...
    def save(self) -> None: ...
    def add(self, dist) -> None: ...
    def remove(self, dist) -> None: ...
    def make_relative(self, path): ...

class RewritePthDistributions(PthDistributions):
    prelude: Any
    postlude: Any

class CommandSpec(list[str]):
    options: Any
    split_args: Any
    @classmethod
    def best(cls) -> type[CommandSpec]: ...
    @classmethod
    def from_param(cls, param) -> CommandSpec: ...
    @classmethod
    def from_environment(cls) -> CommandSpec: ...
    @classmethod
    def from_string(cls, string: str) -> CommandSpec: ...
    def install_options(self, script_text: str) -> None: ...
    def as_header(self) -> str: ...

class WindowsCommandSpec(CommandSpec):
    split_args: Any

class ScriptWriter:
    template: Any
    command_spec_class: Any
    @classmethod
    def get_script_args(cls, dist, executable: Incomplete | None = ..., wininst: bool = ...) -> Iterator[tuple[str, str]]: ...
    @classmethod
    def get_script_header(cls, script_text, executable: Incomplete | None = ..., wininst: bool = ...) -> str: ...
    @classmethod
    def get_args(cls, dist, header: Incomplete | None = ...) -> Iterator[tuple[str, str]]: ...
    @classmethod
    def get_writer(cls, force_windows: bool) -> type[ScriptWriter]: ...
    @classmethod
    def best(cls) -> type[ScriptWriter]: ...
    @classmethod
    def get_header(cls, script_text: str = ..., executable: Incomplete | None = ...) -> str: ...

class WindowsScriptWriter(ScriptWriter):
    command_spec_class: Any
    @classmethod
    def get_writer(cls): ...
    @classmethod
    def best(cls): ...

class WindowsExecutableLauncherWriter(WindowsScriptWriter): ...
class EasyInstallDeprecationWarning(SetuptoolsDeprecationWarning): ...
